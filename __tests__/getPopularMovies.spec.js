const Movie = require('../src/models/Movie');


describe('Get popular movies functionality', () => {

    test("All movies should have a suggestionScore field", ()=> {
        const input =
            [
                {
                    "id": 29889,
                    "original_title": "Silent Venom",
                    "vote_average": 5.5,
                    "vote_count": 23
                }]
            ;

        const output = [
            {

                "id": 29889,
                "original_title":  "Silent Venom",
                "vote_average": 5.5,
                "vote_count": 23,
                "suggestionScore": expect.anything()
            }
        ];

        expect(Movie.generateUserScore(input)).toMatchObject(output);
    });

    test("All movies should sorted by suggestionScore field ASC", ()=> {
        const input =
            [
                {
                    "id": 29889,
                    "original_title": "Silent Venom",
                    "vote_average": 5.5,
                    "vote_count": 23,
                    "suggestionScore": 31
                },
                {
                    "id": 29889,
                    "original_title": "Silent Venom",
                    "vote_average": 5.5,
                    "vote_count": 23,
                    "suggestionScore": 99
                },
                {
                    "id": 29889,
                    "original_title": "Silent Venom",
                    "vote_average": 5.5,
                    "vote_count": 23,
                    "suggestionScore": 85
                }];

        const output =             [
            {
                "id": 29889,
                "original_title": "Silent Venom",
                "vote_average": 5.5,
                "vote_count": 23,
                "suggestionScore": 99
            },
            {
                "id": 29889,
                "original_title": "Silent Venom",
                "vote_average": 5.5,
                "vote_count": 23,
                "suggestionScore": 85
            },
            {
                "id": 29889,
                "original_title": "Silent Venom",
                "vote_average": 5.5,
                "vote_count": 23,
                "suggestionScore": 31
            }];

        expect(Movie.sortByScoreASC(input)).toMatchObject(output);
    });

});
