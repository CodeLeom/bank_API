import Bank from 'database/models/bank';

export default class Services {
  static async addNewBank(bankDetails) {
    try {
      const bank = new Bank(bankDetails);
      return await bank.save();
    } catch (error) {
      throw error;
    }
  }

  static async findAllBanks() {
    try {
      return await Bank.find({});
    } catch (error) {
      throw error;
    }
  }

  static async updateBank(id, bankData) {
    try {
      return await Bank.findByIdAndUpdate(id, bankData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  static async deleteBank(id) {
    try {
      return await Bank.findByIdAndRemove(id);
    } catch (error) {
      throw error;
    }
  }
}
