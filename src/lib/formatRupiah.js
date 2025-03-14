export function formatRupiah(amount) {
    // Ensure amount is a number
    const value = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  
    // Use the Indonesian locale to group by thousands with dot separators
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
  