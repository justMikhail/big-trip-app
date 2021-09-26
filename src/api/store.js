export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getStoreItems(sourceKey) {
    if (!sourceKey) {
      try {
        return JSON.parse(this._storage.getItem(this._storeKey)) || {};
      } catch (err) {
        return {};
      }
    }

    try {
      const store = JSON.parse(this._storage.getItem(this._storeKey)) || {};
      return store[sourceKey] ? store[sourceKey] : {};
    } catch (err) {
      return {};
    }
  }

  setStoreItems(items, key) {
    const prevStorage = this.getStoreItems();

    this._storage.setItem(
      this._storeKey,
      JSON.stringify({...prevStorage, [key]: items}),
    );
  }

  setStoreItem(key, value) {
    const store = this.getStoreItems();

    this._storage.setItem(
      this._storeKey,
      JSON.stringify({...store, [key]: value}),
    );
  }

  removeStoreItem(key) {
    const store = this.getStoreItems();

    delete store[key];

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(store),
    );
  }
}

