import { useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment-timezone'
import withReactContent from 'sweetalert2-react-content'
import operations from '../../graphql/operations'

const MySwal = withReactContent(Swal)

const { newJobMutation } = operations

const jobMutation = () => {
  const [newJob] = useMutation(newJobMutation)

  const createNewJob = async ({ urlInput, paramsInput, fileNameInput }) => {
    const userName = localStorage.getItem('userName')
    const uuid = uuidv4()

    try {
      await newJob({
        variables: {
          input: {
            id: uuid,
            url: urlInput,
            fileName: fileNameInput,
            user: userName,
            createdAt: moment().tz('Europe/Madrid').format(),
            params: paramsInput
          }
        }
      })

      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: `Job Creado\n${uuid}`,
        showConfirmButton: false,
        timer: 3000
      })
    } catch (e) {
      MySwal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al crear job',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }

  return {
    createNewJob
  }
}

export default jobMutation
