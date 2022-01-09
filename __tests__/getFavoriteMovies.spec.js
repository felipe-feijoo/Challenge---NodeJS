const Movie = require('../src/models/Movie');


describe('Get favorite movies functionality', () => {

    test("All favorite movies should have a suggestionForTodayScore field", () => {
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
                "original_title": "Silent Venom",
                "vote_average": 5.5,
                "vote_count": 23,
                "suggestionForTodayScore": expect.anything()
            }
        ];

        expect(Movie.generateUserScore(input, 'favorite')).toMatchObject(output);
    });

    test("All favorite movies should sorted by suggestionForTodayScore field ASC", () => {
        const input =
            [
                {
                    "id": 29889,
                    "original_title": "Silent Venom",
                    "vote_average": 5.5,
                    "vote_count": 23,
                    "suggestionForTodayScore": 31
                },
                {
                    "id": 29889,
                    "original_title": "Silent Venom",
                    "vote_average": 5.5,
                    "vote_count": 23,
                    "suggestionForTodayScore": 99
                },
                {
                    "id": 29889,
                    "original_title": "Silent Venom",
                    "vote_average": 5.5,
                    "vote_count": 23,
                    "suggestionForTodayScore": 85
                }];

        const output = [
            {
                "id": 29889,
                "original_title": "Silent Venom",
                "vote_average": 5.5,
                "vote_count": 23,
                "suggestionForTodayScore": 99
            },
            {
                "id": 29889,
                "original_title": "Silent Venom",
                "vote_average": 5.5,
                "vote_count": 23,
                "suggestionForTodayScore": 85
            },
            {
                "id": 29889,
                "original_title": "Silent Venom",
                "vote_average": 5.5,
                "vote_count": 23,
                "suggestionForTodayScore": 31
            }];

        expect(Movie.sortByScoreASC(input, 'favorite')).toMatchObject(output);
    });



});
