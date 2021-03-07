import ky from 'ky';

const BASE_URL = 'http://localhost:8080';

class RewardService {
  getAll = async () => ky(`${BASE_URL}/channel-points/custom-rewards-configuration`).json()

  updateRewards = async (rewardConf) => ky.put(`${BASE_URL}/channel-points/custom-rewards-configuration`, {
    json: rewardConf,
  })
}

export default new RewardService();
