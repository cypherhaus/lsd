import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-hot-toast";
import { successToast, basicToastStyle, errorToast } from "../../utils/toast";
import { Store } from "../store";

export default class DashboardView {
  private _store: Store;

  withdrawAmount: string = "";
  sendAmount: string = "";
  sendUsername: string = "";
  fundAmount: string = "";
  lnAddress: string = "";

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
  }

  // Set the values of username and amount to send payment to
  setSendUsername = (v: string) => (this.sendUsername = v);
  setSendAmount = (v: string) => (this.sendAmount = v);

  // Set the amount to withdraw value
  setWithdrawAmount = (v: string) => (this.withdrawAmount = v);

  // Set the amount to fund value
  setFundAmount = (v: string) => (this.fundAmount = v);

  // Set the Lightning Address value
  setLightningAddress = (v: string) => (this.lnAddress = v);

  // Handle clicking pay user
  async handlePayUsername(currentUserId: string) {
    const response = await this._store.lightningStore.payUsername(
      currentUserId,
      this.sendUsername,
      this.sendAmount
    );

    if (response.success) {
      successToast(`Sent ${this.sendAmount} sats to ${this.sendUsername}`);

      runInAction(() => {
        this.sendAmount = "";
        this.sendUsername = "";
      });
    }

    return response;
  }

  // Update the lightning address on account
  async handleUpdateAddressClick() {
    const response = await this._store.lightningStore.updateLnAddress(
      this.lnAddress
    );

    if (response.success)
      successToast("Successfully changed Lightning Address");

    runInAction(() => {
      this.lnAddress = "";
    });
    return response;
  }

  // Handle pressing the withdraw button
  async handleWithdrawClick() {
    const response = await this._store.lightningStore.withdraw(
      this.withdrawAmount
    );

    if (response.success) successToast("Successful withdrawal");
    if (!response.success) errorToast("Failed to withdraw");

    this.withdrawAmount = "";
  }

  // Called when clicking Fund button
  handleFundClick() {
    if (this.fundAmount) {
      toast.promise(
        this._store.lightningStore.createCharge(this.fundAmount),
        {
          loading: "Creating a charge..",
          success: "Charge created, please pay the invoice",
          error: "Error creating a charge",
        },
        {
          success: {
            style: basicToastStyle,
            duration: 5000,
            icon: "🔥",
          },
          style: basicToastStyle,
        }
      );
    }
  }

  // Handle charge settled event
  handleChargeSettled() {
    this._store.lightningStore.chargeSettled();
    this._store.authStore.fetchProfile(this._store.authStore.currentUser.id);
    successToast("Successfully funded account");

    runInAction(() => {
      this.fundAmount = "";
    });
  }

  // Handle any events for the wallet profile
  handleWalletUpdate(newUpdate: any) {
    if (this._store.lightningStore.wallet.ln_address !== newUpdate.ln_address) {
      successToast("Updated Lightning Address");
    }

    this._store.lightningStore.setWallet(newUpdate);
  }
}
