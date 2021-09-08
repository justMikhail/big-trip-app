import EventItemView from '../view/event-item';
import EventItemFormView from '../view/event-item-form';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {isEscEvent} from '../utils/utils';

export default class EventPresenter {
  constructor(eventListContainer) {
    this._eventListContainer = eventListContainer;
    this._eventItemComponent = null;
    this._eventItemFormComponent = null;

    this._handleShowEventFormButtonClick = this._handleShowEventFormButtonClick.bind(this);
    this._handleEventFormSubmit = this._handleEventFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventItemComponent = this._eventItemComponent;
    const prevEventItemFormComponent = this._eventItemFormComponent;

    this._eventItemComponent = new EventItemView(this._event);
    this._eventItemFormComponent = new EventItemFormView(this._event);
    this._eventItemComponent.setEditClickHandler(this._handleShowEventFormButtonClick);
    this._eventItemFormComponent.setFormSubmitHandler(this._handleEventFormSubmit);

    if (prevEventItemComponent === null || prevEventItemFormComponent === null) {
      this._renderEventItem();
      return;
    }

    if (this._eventListContainer.getElement().contains(this.prevEventItemComponent.getElement())) {
      replace(this._eventItemComponent, prevEventItemComponent);
    }

    if (this._eventListContainer.getElement().contains(this.prevEventItemFormComponent.getElement())) {
      replace(this._eventItemFormComponent, prevEventItemFormComponent);
    }

    remove(prevEventItemComponent);
    remove(prevEventItemFormComponent);
  }

  destroy() {
    remove(this._eventItemComponent);
    remove(this._eventItemFormComponent);
  }

  _replacePointToForm() {
    replace(this._eventItemFormComponent, this._eventItemComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToPont() {
    replace(this._eventItemComponent, this._eventItemFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
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

  _handleEventFormSubmit() {
    this._replaceFormToPont();
  }

  _renderEventItem() {
    render(this._eventListContainer, this._eventItemComponent, RenderPosition.BEFORE_END);
  }
}
