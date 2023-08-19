async function refreshAndPostLead() {
    try {
      // Refresh token endpoint
      const refreshUrl = 'https://accounts.zoho.eu/oauth/v2/token';

      const refreshParams = new URLSearchParams({
        refresh_token: '',
        client_id: '',
        client_secret: '',
        grant_type: 'refresh_token',
      });

      const refreshResponse = await fetch(`${refreshUrl}?${refreshParams.toString()}`, {
        method: 'POST',
      });
  
      const refreshData = await refreshResponse.json();
  
      // Access token obtained from refresh response
      const accessToken = refreshData.access_token;

      return accessToken;
  
      // Leads API endpoint
      const leadsUrl = 'https://www.zohoapis.eu/crm/v2/leads';
      const leadsData = {
        data: [
          {
            First_Name: 'Stefan',
            Last_Name: 'Gouldson',
            Email: 'stefangouldson@gmail.com',
          },
        ],
      };
  
      // Make the API request to post leads
      const leadsResponse = await fetch(leadsUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadsData),
      });
  
      const leadsResult = await leadsResponse.json();
      console.log('Leads API response:', leadsResult);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  export default defineEventHandler((event) => {
    const token = refreshAndPostLead();
    return {
      token: token
    }
  })
  