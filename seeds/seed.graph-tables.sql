BEGIN;

TRUNCATE
    graphusers,
    piecesteps,
    assignedpieces
    RESTART IDENTITY CASCADE;

INSERT INTO graphusers (username, password)
VALUES
    ('dunder', '$2a$12$UdTKaEIlUSGcKAAUj8u30.R3Ea5s6yOnqhQ7f/ubGDihvMYE1ZDKS'), --password123
    ('b.deboop', '$2a$12$UdTKaEIlUSGcKAAUj8u30.R3Ea5s6yOnqhQ7f/ubGDihvMYE1ZDKS'),
    ('c.bloggs', '$2a$12$UdTKaEIlUSGcKAAUj8u30.R3Ea5s6yOnqhQ7f/ubGDihvMYE1ZDKS'),
    ('s.smith', '$2a$12$UdTKaEIlUSGcKAAUj8u30.R3Ea5s6yOnqhQ7f/ubGDihvMYE1ZDKS'),
    ('lexlor', '$2a$12$UdTKaEIlUSGcKAAUj8u30.R3Ea5s6yOnqhQ7f/ubGDihvMYE1ZDKS'),
    ('wippy', '$2a$12$UdTKaEIlUSGcKAAUj8u30.R3Ea5s6yOnqhQ7f/ubGDihvMYE1ZDKS');


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
