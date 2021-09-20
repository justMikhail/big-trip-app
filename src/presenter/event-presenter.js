import EventPointView from '../view/event-point';
import EventFormView from '../view/event-form';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {isEscEvent} from '../utils/utils';
import {UpdateType, UserAction, ViewMode} from '../const/const';

export default class EventPresenter {
  constructor(eventsListContainer, changeData, changeViewMode) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;
    this._changeViewMode = changeViewMode;

    this._eventPointComponent = null;
    this._eventFormComponent = null;
    this._viewMode = ViewMode.DEFAULT;

    this._handleShowFormButtonClick = this._handleShowFormButtonClick.bind(this);
    this._handleHideFormButtonClick = this._handleHideFormButtonClick.bind(this);
    this._handleEventFormSubmit = this._handleEventFormSubmit.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventPointComponent = this._eventPointComponent;
    const prevEventFormComponent = this._eventFormComponent;

    this._eventPointComponent = new EventPointView(this._event);
    this._eventFormComponent = new EventFormView(this._event);

    this._eventPointComponent.setShowFormClickHandler(this._handleShowFormButtonClick);
    this._eventPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventFormComponent.setHideFormClickHandler(this._handleHideFormButtonClick);
    this._eventFormComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._eventFormComponent.setFormSubmitHandler(this._handleEventFormSubmit);


    if (prevEventPointComponent === null || prevEventFormComponent === null) {
      this._renderEventPoint();
      return;
    }

    if (this._viewMode === ViewMode.DEFAULT) {
      replace(this._eventPointComponent, prevEventPointComponent);
    }

    if (this._viewMode === ViewMode.SHOWING_FORM) {
      replace(this._eventFormComponent, prevEventFormComponent);
    }

    remove(prevEventPointComponent);
    remove(prevEventFormComponent);
  }

  resetViewMode() {
    if (this._viewMode !== ViewMode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  destroy() {
    remove(this._eventPointComponent);
    remove(this._eventFormComponent);
  }

  _replacePointToForm() {
    replace(this._eventFormComponent, this._eventPointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeViewMode();
    this._viewMode = ViewMode.SHOWING_FORM;
  }

  _replaceFormToPoint() {
    replace(this._eventPointComponent, this._eventFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._viewMode = ViewMode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._eventFormComponent.reset(this._event);
      this._replaceFormToPoint();
    }
  }

  _handleShowFormButtonClick() {
    this._replacePointToForm();
  }

  _handleHideFormButtonClick() {
    this._eventFormComponent.reset(this._event);
    this._replaceFormToPoint();
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {...this._event, isFavorite: !this._event.isFavorite},
    );
  }

  _handleEventFormSubmit(event) {
    this._changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      event,
    );
    this._replaceFormToPoint();
  }

  _handleDeleteClick(event) {
    this._changeData(
      UserAction.DELETE_EVENT,
      UpdateType.MAJOR,
      event,
    );
  }

  _renderEventPoint() {
    render(this._eventsListContainer, this._eventPointComponent, RenderPosition.BEFORE_END);
  }
}
