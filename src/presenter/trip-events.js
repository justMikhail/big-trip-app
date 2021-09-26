import TripEventsView from '../view/trip-events';
import EventsSortView from '../view/events-sort';
import EventsListView from '../view/events-list';
import EmptyEventsListView from '../view/empty-events-list';
import LoaderView from '../view/loader';

import Event from './event';
import NewEvent from './new-event';

import {render, remove, RenderPosition} from '../utils/render';
import {filter} from '../utils/date';
import {sortByDate, sortByDuration, sortByPrice} from '../utils/sort';
import {FilterType, SortType, UpdateType, UserAction, ButtonState as EventPresenterViewState} from '../const/const';

export default class TripEvents {
  constructor(tripEventsContainer, eventsModel, filterModel, offersModel, destinationsModel, api) {
    this._tripEventsContainer = tripEventsContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._filterType = FilterType.ALL;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenters = new Map();
    this._isLoading = true;
    this._api = api;

    this._tripEventsComponent = new TripEventsView();
    this._eventsListComponent = new EventsListView();
    this._sortComponent = null;
    this._emptyEventsListComponent = null;
    this._loaderComponent = new LoaderView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewModeChange = this._handleViewModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._newEventPresenter = new NewEvent(this._eventsListComponent, this._handleViewAction, offersModel, destinationsModel);
  }

  init() {
    render(this._tripEventsContainer, this._tripEventsComponent, RenderPosition.BEFORE_END);
    render(this._tripEventsComponent, this._eventsListComponent, RenderPosition.BEFORE_END);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTripEvents();
  }

  createNewEvent(callback) {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this._newEventPresenter.init(callback);
  }

  destroy() {
    this._clearTripEvents({resetSortType: true});

    remove(this._eventsListComponent);
    remove(this._tripEventsComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getEvents() {
    this._filterType = this._filterModel.getFilter();
    const allEvents = this._eventsModel.getEvents();
    const filteredEvents = filter[this._filterType](allEvents);

    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return filteredEvents.sort(sortByDate);
      case SortType.DURATION_DOWN:
        return filteredEvents.sort(sortByDuration);
      case SortType.PRICE_DOWN:
        return filteredEvents.sort(sortByPrice);
    }

    return filteredEvents;
  }

  _renderEvent(event) {
    const eventPresenter = new Event(
      this._eventsListComponent,
      this._handleViewAction,
      this._handleViewModeChange,
      this._offersModel,
      this._destinationsModel);
    eventPresenter.init(event);
    this._eventPresenters.set(event.id, eventPresenter);
  }

  _renderTripEvents() {
    if (this._isLoading) {
      this._renderLoader();
      return;
    }

    if (!this._getEvents().length) {
      this._renderEmptyEventsList();
      return;
    }
    this._renderEventsSort();
    this._renderEventsList();
  }

  _clearTripEvents({resetSortType = false} = {}) {
    this._newEventPresenter.destroy();
    this._eventPresenters.forEach((presenter) => presenter.destroy());
    this._eventPresenters.clear();

    if (this._sortComponent) {
      remove(this._sortComponent);
    }

    remove(this._loaderComponent);

    if (this._emptyEventsListComponent) {
      remove(this._emptyEventsListComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderEventsList() {
    render(this._tripEventsContainer, this._eventsListComponent, RenderPosition.BEFORE_END);
    this._getEvents().forEach((event) => this._renderEvent(event));
  }

  _renderEventsSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new EventsSortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripEventsComponent, this._sortComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderLoader() {
    render(this._tripEventsComponent, this._loaderComponent, RenderPosition.BEFORE_END);
  }

  _renderEmptyEventsList() {
    this._emptyEventsListComponent = new EmptyEventsListView(this._filterType);
    render(this._tripEventsComponent, this._emptyEventsListComponent, RenderPosition.BEFORE_END);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventPresenters.get(update.id).setViewState(EventPresenterViewState.SAVING);
        this._api.updateEvent(update)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          })
          .catch(() => {
            this._eventPresenters.get(update.id).setViewState(EventPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_EVENT:
        this._newEventPresenter.setSaving();
        this._api.addEvent(update).then((response) => {
          this._eventsModel.addEvent(updateType, response);
        })
          .catch(() => {
            this._newEventPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenters.get(update.id).setViewState(EventPresenterViewState.DELETING);
        this._api.deleteEvent(update).then(() => {
          this._eventsModel.deleteEvent(updateType, update);
        })
          .catch(() => {
            this._eventPresenters.get(update.id).setViewState(EventPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearTripEvents();
        this._renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this._clearTripEvents({resetSortType: true});
        this._renderTripEvents();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loaderComponent);
        this._renderTripEvents();
        break;
    }
  }

  _handleViewModeChange() {
    this._newEventPresenter.destroy();
    this._eventPresenters.forEach((presenter) => presenter.resetViewMode());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTripEvents();
    this._renderTripEvents();
  }
}
