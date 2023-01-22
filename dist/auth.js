export const isAuth = (options) => {
    const { authRequired } = options;
    return (req, res, next) => {
        const auth = req.headers.authorization;
        if (auth === 'password' || !authRequired) {
            next();
        }
        else {
            res.status(401);
            res.send('Access forbidden');
        }
    };
};
