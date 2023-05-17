
export const Doctor = (req, res, next) => {
  if (req.user.usertype === 'Admin') {
    next();
  } else if (req.user.usertype === 'Doctor') {
    next();
  } else {
    return res.status(401).send('Access Denied. You must be an admin to access this resource.');
  }
};