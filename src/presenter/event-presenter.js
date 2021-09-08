import EventItemView from '../view/event-item';
import EventItemFormView from '../view/event-item-form';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {isEscEvent} from '../utils/utils';

const ViewMode = {
  DEFAULT: 'DEFAULT',
  SHOWING_FORM: 'SHOWING_FORM',
};

export default class EventPresenter {
  constructor(eventListContainer, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventItemComponent = null;
    this._eventItemFormComponent = null;
    this._viewMode = ViewMode.DEFAULT;

    this._handleShowEventFormButtonClick = this._handleShowEventFormButtonClick.bind(this);
    this._handleEventFormSubmit = this._handleEventFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(eventItem) {
    this._eventItem = eventItem;

    const prevEventItemComponent = this._eventItemComponent;
    const prevEventItemFormComponent = this._eventItemFormComponent;

    this._eventItemComponent = new EventItemView(this._eventItem);
    this._eventItemFormComponent = new EventItemFormView(this._eventItem);
    this._eventItemComponent.setShowFormClickHandler(this._handleShowEventFormButtonClick);
    this._eventItemFormComponent.setFormSubmitHandler(this._handleEventFormSubmit);
    this._eventItemComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevEventItemComponent === null || prevEventItemFormComponent === null) {
      this._renderEventItem();
      return;
    }

    if (this._viewMode === ViewMode.DEFAULT) {
      replace(this._eventItemComponent, prevEventItemComponent);
    }

    if (this._viewMode === ViewMode.SHOWING_FORM) {
      replace(this._eventItemFormComponent, prevEventItemFormComponent);
    }

    remove(prevEventItemComponent);
    remove(prevEventItemFormComponent);
  }

  resetViewMode() {
    if (this._viewMode !== ViewMode.DEFAULT) {
      this._replaceFormToPont();
    }
  }

  destroy() {
    remove(this._eventItemComponent);
    remove(this._eventItemFormComponent);
  }

  _replacePointToForm() {
    replace(this._eventItemFormComponent, this._eventItemComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._viewMode = ViewMode.SHOWING_FORM;
  }

  _replaceFormToPont() {
    replace(this._eventItemComponent, this._eventItemFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._viewMode = ViewMode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._replaceFormToPont();
    }
  }

  _handleShowEventFormButtonClick() {
    this._replacePointToForm();
  }

  _handleEventFormSubmit(eventItem) {
    this._changeData(eventItem);
    this._replaceFormToPont();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._eventItem,
        {
          isFavorite: !this._eventItem.isFavorite,
        },
      ),
    );
  }

  _renderEventItem() {
    render(this._eventListContainer, this._eventItemComponent, RenderPosition.BEFORE_END);
  }
}
