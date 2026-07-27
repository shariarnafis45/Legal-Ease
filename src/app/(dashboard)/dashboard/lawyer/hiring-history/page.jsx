import { getLawyerHiringRequestHistory } from '@/lib/api/hire';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const LawyerHiringHistoryPage = async() => {
    const user = await getUserSession()
    const hiringRequestHistory = await getLawyerHiringRequestHistory(user?.id)
    return (
        <div>
            LawyerHiringHistoryPage
        </div>
    );
};

export default LawyerHiringHistoryPage;