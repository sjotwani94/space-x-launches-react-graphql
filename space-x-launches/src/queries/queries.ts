import { gql } from '@apollo/client';

export const GET_LAUNCH_DETAILS = gql`
    query ExampleQuery {
        launches {
            details
            id
            is_tentative
            launch_date_local
            launch_site {
                site_id
                site_name
                site_name_long
            }
            launch_year
            launch_success
            links {
                article_link
                video_link
                wikipedia
            }
            mission_name
            rocket {
                rocket_name
                rocket_type
            }
        }
    }
`;
