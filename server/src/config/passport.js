import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const dbUrl = 'http://localhost:5000';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};

export const passportConfig = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      axios
        .get(`${dbUrl}/users/${jwt_payload.id}`)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
