import EventPointView from '../view/event-point';
import EventFormView from '../view/event-form';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {isEscEvent} from '../utils/utils';
import {UpdateType, UserAction, ViewMode, ButtonState} from '../const/const';

export default class Event {
  constructor(eventsListContainer, changeData, changeViewMode, offersModel, destinationsModel) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;
    this._changeViewMode = changeViewMode;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

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

    const offers = this._offersModel.getOffers();
    const destinations = this._destinationsModel.getDestinations();

    this._eventPointComponent = new EventPointView(this._event);
    this._eventFormComponent = new EventFormView(offers, destinations, true, this._event);

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
      replace(this._eventPointComponent, prevEventFormComponent);
      this._mode = ViewMode.DEFAULT;
    }

    remove(prevEventPointComponent);
    remove(prevEventFormComponent);
  }

  resetViewMode() {
    if (this._viewMode !== ViewMode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  setViewState(state) {
    if (this._mode === ViewMode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this._eventFormComponent.updateState({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case ButtonState.SAVING:
        this._eventFormComponent.updateState({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case ButtonState.DELETING:
        this._eventFormComponent.updateState({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case ButtonState.ABORTING:
        this._eventPointComponent.shake(resetFormState);
        this._eventFormComponent.shake(resetFormState);
        break;
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
