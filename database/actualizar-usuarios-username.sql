USE marketplus_db;

ALTER TABLE usuarios
    ADD COLUMN IF NOT EXISTS username VARCHAR(20) NULL AFTER role_id;

UPDATE usuarios
SET username = CONCAT('user_', id)
WHERE username IS NULL OR username = '';

ALTER TABLE usuarios
    MODIFY COLUMN username VARCHAR(20) NOT NULL;

ALTER TABLE usuarios
    ADD UNIQUE KEY IF NOT EXISTS uk_usuarios_username (username);

ALTER TABLE usuarios
    ADD UNIQUE KEY IF NOT EXISTS uk_usuarios_dni (dni);

ALTER TABLE usuarios
    ADD UNIQUE KEY IF NOT EXISTS uk_usuarios_telefono (telefono);
