import ky from 'ky';

const BASE_URL = 'http://localhost:8080';

class PubSubService {
  triggerReward = async (rewardConf) => {
    try {
      return await ky.post(`${BASE_URL}/pub-sub/test/redemption`, {
        json: rewardConf,
      }).text();
    } catch (err) {
      if (err.response) {
        const { message } = JSON.parse(await err.response.text());
        throw new Error(message);
      } else {
        throw err;
      }
    }
  }
}

export default new PubSubService();
