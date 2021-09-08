import EventItemView from '../view/event-item';
import EventItemFormView from '../view/event-item-form';
import {render, RenderPosition, replace} from '../utils/render';
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
    this._eventItemComponent = new EventItemView(event);
    this._eventItemFormComponent = new EventItemFormView(event);
    this._renderEventItem();
    this._eventItemComponent.setEditClickHandler(this._handleShowEventFormButtonClick);
    this._eventItemFormComponent.setFormSubmitHandler(this._handleEventFormSubmit);
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
    if (evt.key === 'Escape' || evt.key === 'Esc') {
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
