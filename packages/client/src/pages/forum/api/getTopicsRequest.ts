import { AppApiForum } from '../../../api/AppApiForum'

export default function getTopicsRequest() {
  return AppApiForum.getTopics()
    .then(data => data)
    .catch(err => {
      throw err
    })
}
