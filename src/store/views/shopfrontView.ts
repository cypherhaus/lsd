import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";

export default class ShopfrontView {
  private _store: Store;

  coverPhoto: any = null;
  profilePhoto: any = null;

  businessBlurb: string = "";

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
  }

  setCoverPhoto = (photo: any) => {
    runInAction(() => {
      this.coverPhoto = photo;
    });
  };

  setProfilePhoto = (photo: any) => {
    runInAction(() => {
      this.profilePhoto = photo;
    });
  };

  // Todo finish update shift
  handleSave = () => {
    console.log("called");
  };
}
