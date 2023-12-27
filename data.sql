# INSERT INTO posts (image_url, title, context) VALUES (
#                           'testUlr1','title1','content1'
#                          ),
#                          (
#                              'testUlr2','title12','content2'
#                          ),
#                         (
#                           'testUlr3','title3','content3'
#                         );
#
INSERT INTO tags (tags_name)
VALUES ('Culture'),
       ('Animal'),
       ('Auto'),
       ('Science');

INSERT INTO post_tags (post_id, tag_id)
VALUES (1, 1),
       (1, 2),
       (2, 2),
       (3, 3);




