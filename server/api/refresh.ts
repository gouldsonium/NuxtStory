async function refreshAndPostLead() {
    try {
      // Refresh token endpoint
      const refreshUrl = 'https://accounts.zoho.eu/oauth/v2/token';
      const refreshParams = new URLSearchParams({
        refresh_token: '1000.7a567acdf09d2369fd473f02aa0c6473.244ccb3379553c11c5190d282c0ad43b',
        client_id: '1000.42EQXUXV9GLGA8M2A66WN5AUTL1ZTC',
        client_secret: 'be5e2b9fa3cadf2dacbcf24eb2aace7078b8220518',
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
  