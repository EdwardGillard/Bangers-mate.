import { notify } from 'react-notify-toast'

const styles = {
  background: '#000000', text: '#FF0000'
}

export const toast = message => {
  notify.show(message, 'custom', 5000, styles)
}