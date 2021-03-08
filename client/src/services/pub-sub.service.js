import ky from 'ky';

const BASE_URL = 'http://localhost:8080';

class PubSubService {
  triggerReward = async (rewardConf) => ky.post(`${BASE_URL}/pub-sub/test/redemption`, {
    json: rewardConf,
  })
}

export default new PubSubService();
