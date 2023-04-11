import axios from 'axios';

async function getConditions() {
    try {
        const response = await axios.get('https://loa.vatsim-germany.org/api/v1/conditions')
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default {
    getConditions,
};