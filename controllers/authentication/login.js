exports.getLogin = async (req, res) => {
    res.render('layouts/authentication/login', { layout: false, docTitle: 'Login Page' });
}

