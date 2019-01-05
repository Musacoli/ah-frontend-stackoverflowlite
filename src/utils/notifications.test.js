import swal from 'sweetalert2';
import Notification from './notifications';

jest.mock('sweetalert2');

describe('Notifications', () => {
  test('It resolves if the user resolves', () => {
    swal.mockResolvedValue({ value: true });
    expect(Notification.confirm('Hello world').resolves).toEqual(undefined);
  });
});
