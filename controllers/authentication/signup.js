exports.getSignup = async (req, res) => {
    res.render('layouts/authentication/signup', { layout: false, docTitle: 'Sign Up Page' });
}