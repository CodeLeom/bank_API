import Response from 'utils/response';
import DB from 'services/index';

export default class Controller {
  static async getAllBanks(_, res, next) {
    try {
      //   Bank.geoNear(
      //     {
      //       type: 'Point',
      //       coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
      //     },
      //     { maxDistance: 100000, spherical: true },
      //   ).then(function (bank) {
      //     res.send(bank);
      //   });

      const banks = await DB.findAllBanks();
      return Response.customResponse(res, 200, 'All banks', {
        banks,
        total: banks.length,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addBank(req, res, next) {
    const bankData = req.body;

    try {
      const bank = await DB.addNewBank(bankData);

      return Response.customResponse(res, 200, 'Bank details added', bank);
    } catch (error) {
      return next(error);
    }
  }

  static async updateBank(req, res, next) {
    const { id } = req.params;

    const bankData = req.body;

    try {
      const bank = await DB.updateBank(id, bankData);

      return Response.customResponse(res, 200, 'Bank details updated', bank);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteBank(req, res, next) {
    const { id } = req.params;

    try {
      await DB.deleteBank(id);

      return Response.customResponse(res, 200, 'Bank details removed');
    } catch (error) {
      return next(error);
    }
  }
}
