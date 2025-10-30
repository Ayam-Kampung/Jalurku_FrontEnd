export const getLikertLabel = (n) => {
  const labels = {
    1: '😥 Sangat Tidak Setuju',
    2: '🙁 Tidak Setuju',
    3: '😐 Netral',
    4: '🙂 Setuju',
    5: '😄 Sangat Setuju'
  };
  return labels[n];
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('id-ID');
};