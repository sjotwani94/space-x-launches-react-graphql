import { gql } from '@apollo/client';

export const GET_ROCKET_DETAILS = gql`
    query RocketDetailsQuery($rocketId: ID!) {
        rocket(id: $rocketId) {
            active
            boosters
            company
            cost_per_launch
            country
            description
            diameter {
                feet
                meters
            }
            height {
                feet
                meters
            }
            id
            mass {
                kg
                lb
            }
            name
        }
    }
`;
