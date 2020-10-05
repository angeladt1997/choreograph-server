BEGIN;

TRUNCATE
    graphusers,
    piecesteps,
    assignedpieces
    RESTART IDENTITY CASCADE;

INSERT INTO graphusers (username, password)
VALUES
    ('dunder', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
    ('b.deboop', '$2a$12$VQ5HgWm34QQK2rJyLc0lmu59cy2jcZiV6U1.bE8rBBnC9VxDf/YQO'),
    ('c.bloggs', '$2a$12$2fv9OPgM07xGnhDbyL6xsuAeQjAYpZx/3V2dnu0XNIR27gTeiK2gK'),
    ('s.smith', '$2a$12$/4P5/ylaB7qur/McgrEKwuCy.3JZ6W.cRtqxiJsYCdhr89V4Z3rp.'),
    ('lexlor', '$2a$12$Hq9pfcWWvnzZ8x8HqJotveRHLD13ceS7DDbrs18LpK6rfj4iftNw.'),
    ('wippy', '$2a$12$ntGOlTLG5nEXYgDVqk4bPejBoJP65HfH2JEMc1JBpXaVjXo5RsTUu');


INSERT INTO assignedpieces  (user_id, userName, piece)
VALUES
    (1, 'GrapherOne', '2112'),
    (2, 'GrapherTwo', 'Baired'),
    (3, 'GrapherThree','2112'),
    (4, 'GrapherFour', 'MSLCRS(SOLO)');

INSERT INTO piecesteps  (user_id, title, content)
VALUES
    (1, '2112','One dance initiates snapping. All other dancers slowly join in. Dancer who starts snaps gives a loud clap to stop it' ),
    (1, 'Baired', 'Dancers solo onto stage from opposite downstage wings, one mover at a time with a 30 second space of time between enterances'),
    (1, 'MSLCRS(SOLO)', 'Dancer (soloist) starts downstage in the chair facing upstage with a large mirror covering the back sham');



COMMIT;
