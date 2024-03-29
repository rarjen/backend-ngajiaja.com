const BaseService = require('../../../base/base.service');
const ApiError = require('../../../helpers/errorHandler');
const SendEmailNotification = require('../../../utils/nodemailer');
const { User, Pengajar } = require('../../../models');

class TeacherService extends BaseService {
  async checkUser(id) {
    const result = await User.findOne({ where: { id } });
    if (!result) throw ApiError.notFound('User not found');
  }

  async checkTeacherDuplicate(id) {
    const result = await Pengajar.findOne({ where: { user_id: id } });
    if (result) throw ApiError.badRequest('Data duplicated');
  }

  async sendNotificationEmail(email, name) {
    const getHtml = await SendEmailNotification.getHtml('notifikasiPengajar.ejs', {
      email,
      name,
    });
    SendEmailNotification.sendMail(email, 'Register Pengajar Notification', getHtml);
  }
}

module.exports = TeacherService;
