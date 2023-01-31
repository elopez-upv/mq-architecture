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

    await newJob({
      variables: {
        input: {
          id: uuidv4(),
          url: urlInput,
          fileName: fileNameInput,
          user: userName,
          createdAt: moment().tz('Europe/Madrid').format(),
          params: paramsInput
        }
      }
    })

    MySwal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Operación Exitosa',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return {
    createNewJob
  }
}

export default jobMutation
