import EventPointView from '../view/event-point';
import EventFormView from '../view/event-form';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {isEscEvent} from '../utils/utils';
import {ViewMode} from '../const/const';

export default class EventPresenter {
  constructor(eventListContainer, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventPointComponent = null;
    this._eventFormComponent = null;
    this._viewMode = ViewMode.DEFAULT;

    this._handleShowEventFormButtonClick = this._handleShowEventFormButtonClick.bind(this);
    this._handleEventFormSubmit = this._handleEventFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventPointComponent = this._eventPointComponent;
    const prevEventFormComponent = this._eventFormComponent;

    this._eventPointComponent = new EventPointView(this._event);
    this._eventFormComponent = new EventFormView(this._event);
    this._eventPointComponent.setShowFormClickHandler(this._handleShowEventFormButtonClick);
    this._eventFormComponent.setFormSubmitHandler(this._handleEventFormSubmit);
    this._eventPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

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
      this._replaceFormToPont();
    }
  }

  destroy() {
    remove(this._eventPointComponent);
    remove(this._eventFormComponent);
  }

  _replacePointToForm() {
    replace(this._eventFormComponent, this._eventPointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._viewMode = ViewMode.SHOWING_FORM;
  }

  _replaceFormToPont() {
    replace(this._eventPointComponent, this._eventFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._viewMode = ViewMode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._eventFormComponent.reset(this._event);
      this._replaceFormToPont();
    }
  }

  _handleShowEventFormButtonClick() {
    this._replacePointToForm();
  }

  _handleEventFormSubmit(event) {
    this._changeData(event);
    this._replaceFormToPont();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._event,
        {
          isFavorite: !this._event.isFavorite,
        },
      ),
    );
  }

  _renderEventPoint() {
    render(this._eventListContainer, this._eventPointComponent, RenderPosition.BEFORE_END);
  }
}
