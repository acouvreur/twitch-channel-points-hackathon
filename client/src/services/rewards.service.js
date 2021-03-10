import ky from 'ky';

const BASE_URL = 'http://localhost:8080';

class RewardService {
  getAll = async () => ky(`${BASE_URL}/channel-points/custom-rewards-configuration`).json()

  updateRewardsConfig = async (rewardConf) => ky.put(`${BASE_URL}/channel-points/custom-rewards-configuration`, {
    json: rewardConf,
  })

  createReward = async (rewardConf) => ky.post(`${BASE_URL}/channel-points/custom-rewards`, {
    json: rewardConf.reward,
  }).json()

  deleteReward = async (rewardConf) => ky.delete(`${BASE_URL}/channel-points/custom-rewards/${rewardConf.reward.id}`)

  updateReward = async (rewardConf) => ky.put(`${BASE_URL}/channel-points/custom-rewards/${rewardConf.reward.id}`, {
    json: rewardConf.reward,
  })

  toggleReward = async (id, isEnabled) => ky.put(`${BASE_URL}/channel-points/custom-rewards/${id}`, {
    json:
    {
      isEnabled,
    },
  })
}

export default new RewardService();
