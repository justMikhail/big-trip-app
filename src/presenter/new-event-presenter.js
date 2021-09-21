import EventFormView from '../view/event-form';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render';
import {UserAction, UpdateType} from '../const/const';

export default class NewEventPresenter {
  constructor(eventsListContainer, changeData) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;

    this._eventFormComponent = null;
    this._destroyCallback = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._eventFormComponent !== null) {
      return;
    }

    this._eventFormComponent = new EventFormView();
    this._eventFormComponent.setFormSubmitHandler(this._handleSubmitClick);
    this._eventFormComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._eventsListContainer, this._eventFormComponent, RenderPosition.AFTER_BEGIN);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventFormComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._eventFormComponent);
    this._eventFormComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleSubmitClick(event) {
    this._changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {...event, id: nanoid()},
    );

    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }
}