const mail_min = 5, pas_min = 6;
let accounts = {
  'user@gmail.com': 'UserPass',
  'admin@gmail.com': 'AdminPass'
};
const mail = prompt('Enter your email');
if (!mail) {
  alert('Canceled');
} else if (mail.length < mail_min) {
  alert('I don\'t know any emails having name length less than 5 symbols');
} else if (accounts[mail]) {
  const pas = prompt('Enter your password');
  if (!pas) {
    alert('Canceled');
  } else if (pas === accounts[mail]) {
    if (confirm('Do you want to change your password?')) {
      const oldpas = prompt('Write your old password');
      if (!oldpas) {
        alert('Canceled');
     } else if (pas === oldpas) {
        const newpas = prompt('Enter your new password');
        if (!newpas) {
          alert('Canceled');
        } else if (newpas.length < pas_min) {
          alert('It’s too short password. Sorry.');
        } else {
          const newpas2 = prompt('Enter your new password again');
          newpas2 === newpas ? 
          alert('You have successfully changed your password') : 
          alert('You wrote the wrong password');
        }
      } else {
        alert('Wrong Password');
      }  
    } else {
      alert('You have failed the change');
    }
  } else {
    alert('Wrong Password');
  }
} else {
  alert('I don’t know you');
}