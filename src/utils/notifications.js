import { notify } from 'react-notify-toast';
import swal from 'sweetalert2';

class Notify {
  /**
   * Shows a success notification
   */
  static success(message, time = 2000) {
    return Notify.make(message, 'success', time);
  }

  /**
   * Shows an error message
   * @param  {String} message
   * @param  {Number} time
   */
  static error(message, time = 2000) {
    return Notify.make(message, 'error', time);
  }

  /**
   * Makes a generic notification of a given type
   * @param  {String} message
   * @param  {String} type
   * @param  {Number} time
   */
  static make(message, type, time = 2000) {
    return notify.show(message, type, time);
  }

  /**
   * Show a confirmation Modal to a user before proceeding
   * @param  {String} text
   * @param  {String} title
   * @return {Promise}
   */
  static confirm(text, title = 'Are you sure?') {
    return new Promise(resolve => {
      swal({
        confirmButtonText: 'Okay',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        text,
        title,
        type: 'question',
        showCancelButton: true,
      }).then(result => (result.value ? resolve() : null));
    });
  }
}

export default Notify;
