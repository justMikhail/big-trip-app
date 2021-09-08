import EventItemView from '../view/event-item';
import EventItemFormView from '../view/event-item-form';
import {render, RenderPosition, replace} from '../utils/render';

export default class EventPresenter {
  constructor(eventListContainer) {
    this._eventListContainer = eventListContainer;
    this._eventItemComponent = null;
    this._eventItemFormComponent = null;
  }

  init(event) {
    this._event = event;
    this._eventItemComponent = new EventItemView(event);
    this._eventItemFormComponent = new EventItemFormView(event);
    this._renderEventItem();
  }

  _renderEventItem() {

    const replaceItemToItemForm = () => {
      replace(this._eventItemFormComponent, this._eventItemComponent);
    };

    const replaceItemFormToItem = () => {
      replace(this._eventItemComponent, this._eventItemFormComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceItemFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this._eventItemComponent
      .setEditClickHandler(() => {
        replaceItemToItemForm();
        document.addEventListener('keydown', onEscKeyDown);
      });

    this._eventItemFormComponent
      .setFormSubmitHandler(() => {
        replaceItemFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      });

    render(this._eventListContainer, this._eventItemComponent, RenderPosition.BEFORE_END);
  }
}
