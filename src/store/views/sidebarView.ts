import { makeAutoObservable } from "mobx";
import { TRANSFER } from "../../constants/sidebar";

export default class SidebarView {
  open: boolean = false;
  modalType: string | null = null;
  activePanel: string = TRANSFER;

  constructor() {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
  }

  handleSidebarItemPress(panel: string) {
    this.activePanel = panel;
  }

  // Handle Modal close
  handleCloseModal() {
    this.open = false;
  }

  // Handle Modal close
  handleOpenModal(type: string) {
    this.modalType = type;
    this.open = true;
  }
}
