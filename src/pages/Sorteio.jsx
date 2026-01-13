import React, { useState } from 'react';
import './Sorteio.css';

const Sorteio = () => {
  const [searchNumbers, setSearchNumbers] = useState(['', '', '', '']);
  const [selectedPrize, setSelectedPrize] = useState('1');
  const [result, setResult] = useState('');
  const [lastCouponNumber, setLastCouponNumber] = useState('');

  const handleNumberChange = (index, value) => {
    const newNumbers = [...searchNumbers];
    newNumbers[index] = value;
    setSearchNumbers(newNumbers);
  };

  const setPrizeSelection = (value) => {
    setSelectedPrize(value);
  };

  const concatenateNumber = () => {
    const fullNumber = searchNumbers.join('');
    if (fullNumber.length !== 8 || isNaN(parseInt(fullNumber))) {
      setResult("Número inválido. Por favor, digite 8 dígitos.");
      return;
    }
    findCouponByNumber(fullNumber);
  };

  const getCouponByNumber = () => {
    if (!lastCouponNumber) {
      setResult("Nenhum cupom foi armazenado.");
      return;
    }
    
    const couponNumber = parseInt(lastCouponNumber.replace(/\./g, ''), 10);
    if (isNaN(couponNumber) || couponNumber < 0 || couponNumber > 99999999) {
      setResult("Número de cupom inválido. Por favor, digite um número entre 0 e 99999999.");
      return;
    }

    const coupon = generateCoupon(couponNumber);
    
    const formatCouponNumberForDisplay = (number) => {
      let num = Math.min(Number(number), 10000000);
      
      if (num >= 10000000) {
        return "10.000.000";
      }
      
      let str = num.toString().padStart(7, '0');
      return str.replace(/(\d{1})(\d{3})(\d{3})/, '$1.$2.$3');
    };
    
    const formattedCouponNumber = formatCouponNumberForDisplay(couponNumber);
    
    let output = `<div class="coupon-container"><h2>CUPOM N° ${formattedCouponNumber}</h2>`;
    output += `<pre>${printCoupon([coupon[parseInt(selectedPrize) - 1]], parseInt(selectedPrize))}</pre></div>`;
    setResult(output);
  };

  const generateCoupon = (couponNumber) => {
    const intervals = [
      {
        start: ["50515253", "30313233", "90919293", "01020304", "81828384", "61626364", "21222324", "70717273", "41424344", "10111213"],
        end: ["60000000", "40000000", "100000000", "10000000", "90000000", "70000000", "30000000", "80000000", "50000000", "20000000"],
        after: ["50000001", "30000001", "90000001", "00000001", "80000001", "60000001", "20000001", "70000001", "40000001", "10000001"],
        limit: ["50515252", "30313232", "90919292", "01020303", "81828383", "61626363", "21222323", "70717273", "41424343", "10111212"]
      },
      {
        start: ["01020305", "41424345", "61626365", "10111214", "90919294", "70717274", "30313234", "81828385", "50515254", "21222325"],
        end: ["10000000", "50000000", "70000000", "20000000", "100000000", "80000000", "40000000", "90000000", "60000000", "30000000"],
        after: ["00000001", "40000001", "60000001", "10000001", "90000001", "70000001", "30000001", "80000001", "50000001", "20000001"],
        limit: ["01020304", "41424344", "61626364", "10111213", "90919293", "70717273", "30313233", "81828384", "50515253", "21222324"]
      },
      {
        start: ["10111215", "50515255", "70717275", "21222326", "01020306", "81828386", "41424346", "90919295", "61626366", "30313235"],
        end: ["20000000", "60000000", "80000000", "60000000", "10000000", "90000000", "50000000", "100000000", "70000000", "40000000"],
        after: ["10000001", "50000001", "70000001", "50000001", "00000001", "80000001", "40000001", "90000001", "60000001", "30000001"],
        limit: ["10111214", "50515254", "70717274", "21222325", "01020305", "81828385", "41424345", "90919294", "61626365", "30313234"]
      },
      {
        start: ["21222327", "61626367", "81828387", "30313236", "10111216", "90919296", "50515256", "01020307", "70717276", "41424347"],
        end: ["30000000", "70000000", "90000000", "40000000", "20000000", "100000000", "60000000", "10000000", "80000000", "50000000"],
        after: ["20000001", "60000001", "80000001", "30000001", "10000001", "90000001", "50000001", "00000001", "70000001", "40000001"],
        limit: ["21222326", "61626366", "81828386", "30313235", "10111215", "90919295", "50515255", "01020306", "70717275", "41424346"]
      },
      {
        start: ["30313237", "70717277", "90919297", "41424348", "21222328", "01020308", "61626368", "10111217", "81828388", "50515257"],
        end: ["40000000", "80000000", "100000000", "50000000", "30000000", "10000000", "70000000", "20000000", "90000000", "60000000"],
        after: ["30000001", "70000001", "90000001", "40000001", "20000001", "00000001", "60000001", "10000001", "80000001", "50000001"],
        limit: ["30313236", "70717276", "90919296", "41424347", "21222327", "01020307", "61626367", "10111216", "81828388", "50515256"]
      },
      {
        start: ["41424349", "81828389", "01020309", "50515258", "30313238", "10111218", "70717278", "21222329", "90919298", "61626369"],
        end: ["50000000", "90000000", "10000000", "60000000", "30000000", "20000000", "80000000", "30000000", "100000000", "70000000"],
        after: ["40000001", "80000001", "00000001", "50000001", "20000001", "10000001", "70000001", "20000001", "90000001", "60000001"],
        limit: ["41424348", "81828388", "01020308", "50515257", "30313237", "10111217", "70717277", "21222328", "90919297", "61626368"]
      }
    ];

    let coupon = [];
    for (let i = 0; i < intervals.length; i++) {
      let col = [];
      for (let j = 0; j < intervals[i].start.length; j++) {
        let num = incrementNumber(
          intervals[i].start[j],
          couponNumber - 1,
          intervals[i].end[j],
          intervals[i].after[j],
          intervals[i].limit[j]
        );
        col.push(num);
      }
      coupon.push(col);
    }
    return coupon;
  };

  const incrementNumber = (start, increment, end, after, limit) => {
    let num = BigInt(start) + BigInt(increment);

    if (num > BigInt(end)) {
      num = BigInt(after) + (num - BigInt(end) - 1n);
    }

    if (num > BigInt(limit)) {
      const range = BigInt(limit) - BigInt(start) + 1n;
      if (range > 0n) {
        num = BigInt(start) + ((num - BigInt(start)) % range);
      }
    }

    // Retorna o número formatado com 8 dígitos sem espaços
    return num.toString().slice(-8).padStart(8, '0');
  };

  const searchCoupons = (searchNumber, selectedColumn) => {
    const intervals = [
      {
        start: ["50515253", "30313233", "90919293", "01020304", "81828384", "61626364", "21222324", "70717273", "41424344", "10111213"],
        end: ["60000000", "40000000", "100000000", "10000000", "90000000", "70000000", "30000000", "80000000", "50000000", "20000000"],
        after: ["50000001", "30000001", "90000001", "00000001", "80000001", "60000001", "20000001", "70000001", "40000001", "10000001"],
        limit: ["50515252", "30313232", "90919292", "01020303", "81828383", "61626363", "21222323", "70717273", "41424343", "10111212"]
      },
      {
        start: ["01020305", "41424345", "61626365", "10111214", "90919294", "70717274", "30313234", "81828385", "50515254", "21222325"],
        end: ["10000000", "50000000", "70000000", "20000000", "100000000", "80000000", "40000000", "90000000", "60000000", "30000000"],
        after: ["00000001", "40000001", "60000001", "10000001", "90000001", "70000001", "30000001", "80000001", "50000001", "20000001"],
        limit: ["01020304", "41424344", "61626364", "10111213", "90919293", "70717273", "30313233", "81828384", "50515253", "21222324"]
      },
      {
        start: ["10111215", "50515255", "70717275", "21222326", "01020306", "81828386", "41424346", "90919295", "61626366", "30313235"],
        end: ["20000000", "60000000", "80000000", "60000000", "10000000", "90000000", "50000000", "100000000", "70000000", "40000000"],
        after: ["10000001", "50000001", "70000001", "50000001", "00000001", "80000001", "40000001", "90000001", "60000001", "30000001"],
        limit: ["10111214", "50515254", "70717274", "21222325", "01020305", "81828385", "41424345", "90919294", "61626365", "30313234"]
      },
      {
        start: ["21222327", "61626367", "81828387", "30313236", "10111216", "90919296", "50515256", "01020307", "70717276", "41424347"],
        end: ["30000000", "70000000", "90000000", "40000000", "20000000", "100000000", "60000000", "10000000", "80000000", "50000000"],
        after: ["20000001", "60000001", "80000001", "30000001", "10000001", "90000001", "50000001", "00000001", "70000001", "40000001"],
        limit: ["21222326", "61626366", "81828386", "30313235", "10111215", "90919295", "50515255", "01020306", "70717275", "41424346"]
      },
      {
        start: ["30313237", "70717277", "90919297", "41424348", "21222328", "01020308", "61626368", "10111217", "81828388", "50515257"],
        end: ["40000000", "80000000", "100000000", "50000000", "30000000", "10000000", "70000000", "20000000", "90000000", "60000000"],
        after: ["30000001", "70000001", "90000001", "40000001", "20000001", "00000001", "60000001", "10000001", "80000001", "50000001"],
        limit: ["30313236", "70717276", "90919296", "41424347", "21222327", "01020307", "61626367", "10111216", "81828388", "50515256"]
      },
      {
        start: ["41424349", "81828389", "01020309", "50515258", "30313238", "10111218", "70717278", "21222329", "90919298", "61626369"],
        end: ["50000000", "90000000", "10000000", "60000000", "30000000", "20000000", "80000000", "30000000", "100000000", "70000000"],
        after: ["40000001", "80000001", "00000001", "50000001", "20000001", "10000001", "70000001", "20000001", "90000001", "60000001"],
        limit: ["41424348", "81828388", "01020308", "50515257", "30313237", "10111217", "70717277", "21222328", "90919297", "61626368"]
      }
    ];

    let searchNumberBigInt = BigInt(searchNumber);

    if (searchNumberBigInt === 0n) {
      searchNumberBigInt = BigInt("100000000");
    }

    let results = [];
    let couponSet = new Set();

    for (let prizeIndex = 0; prizeIndex < intervals.length; prizeIndex++) {
      const interval = intervals[prizeIndex];
      let found = false;
      let couponNumber;

      for (let i = 0; i < interval.start.length; i++) {
        const start = BigInt(interval.start[i]);
        const end = BigInt(interval.end[i]);

        if (searchNumberBigInt >= start && searchNumberBigInt <= end) {
          let offset = searchNumberBigInt - start;
          couponNumber = Number(offset) + 1;

          if (!couponSet.has(`${prizeIndex}-${couponNumber}`)) {
            results.push({
              prizeIndex: prizeIndex,
              couponNumber: couponNumber,
              prizeNumber: searchNumber
            });
            couponSet.add(`${prizeIndex}-${couponNumber}`);
          }

          found = true;
          break;
        }
      }

      if (!found) {
        for (let i = 0; i < interval.after.length; i++) {
          const after = BigInt(interval.after[i]);
          const end = BigInt(interval.end[i]);
          const limit = BigInt(interval.limit[i]);

          const diff = end - limit - 0n;
          if (diff !== 0n) {
            if (searchNumberBigInt >= after && searchNumberBigInt <= end) {
              let offset = searchNumberBigInt - after;
              couponNumber = Number(offset + diff) + 1;

              if (!couponSet.has(`${prizeIndex}-${couponNumber}`)) {
                results.push({
                  prizeIndex: prizeIndex,
                  couponNumber: couponNumber,
                  prizeNumber: searchNumber
                });
                couponSet.add(`${prizeIndex}-${couponNumber}`);
              }

              found = true;
              break;
            }
          }
        }
      }

      if (!found) {
        const start = BigInt(interval.start[0]);
        const end = BigInt(interval.end[0]);
        const after = BigInt(interval.after[0]);
        const range = end - after + 1n;

        if (range !== 0n) {
          let offset = (searchNumberBigInt - start) % range;
          couponNumber = Number(offset) + 1;

          if (!couponSet.has(`${prizeIndex}-${couponNumber}`)) {
            results.push({
              prizeIndex: prizeIndex,
              couponNumber: couponNumber,
              prizeNumber: searchNumber
            });
            couponSet.add(`${prizeIndex}-${couponNumber}`);
          }
        }
      }
    }

    const filteredResults = results.filter(result => result.prizeIndex === selectedColumn - 1);

    if (filteredResults.length === 0) {
      return {
        result: "Nenhum cupom encontrado para a coluna selecionada.",
        results: []
      };
    }

    const couponNumber = filteredResults[0].couponNumber;
    const coupon = generateCoupon(couponNumber);
    
    const formatCouponNumberForDisplay = (number) => {
      let num = Math.min(Number(number), 10000000);
      
      if (num === 10000000) {
        return "10.000.000";
      }
      
      let str = num.toString().padStart(7, '0');
      return str.replace(/(\d{1})(\d{3})(\d{3})/, '$1.$2.$3');
    };

    const formattedCouponNumber = formatCouponNumberForDisplay(couponNumber);
    setLastCouponNumber(formattedCouponNumber);

    let result = `<div style="text-align: center; margin: 20px 0;">`;
    result += `<h3>NÚMERO DO CUPOM: ${formattedCouponNumber}</h3>`;
    result += `<h4>${selectedColumn}º PRÊMIO</h4>`;
    result += `</div>`;

    result += printCoupon([coupon[selectedColumn - 1]], selectedColumn);

    return {
      result: result,
      results: filteredResults
    };
  };

  const findCouponByNumber = (fullNumber) => {
    const selectedColumn = parseInt(selectedPrize);
    const { result, results } = searchCoupons(fullNumber, selectedColumn);

    if (results.length > 0) {
      setResult(result);
    } else {
      setResult("Erro ao processar o número.");
    }
  };

  const printCoupon = (coupon, selectedColumn) => {
    const highlightNumber = searchNumbers.join('').padStart(8, '0');

    let output = "<table class='prize-table'><thead><tr>";

    // Define o texto do prêmio baseado no índice selecionado
    let prizeText;
    if (selectedColumn === 6) {
      prizeText = 'EXTRA';
    } else {
      prizeText = selectedColumn + 'º PRÊMIO';
    }
    
    output += `<th>${prizeText}</th>`;

    output += "</tr></thead><tbody>";

    const maxRows = Math.max(...coupon.map(line => line.length));

    for (let row = 0; row < maxRows; row++) {
      output += "<tr>";
      for (let col = 0; col < coupon.length; col++) {
        const cell = coupon[col][row] !== undefined ? coupon[col][row].toString() : "";
        
        // Formatar o número para agrupar em dezenas
        let formattedCell = "";
        if (cell) {
          // Remove espaços existentes e formata corretamente
          const cleanNumber = cell.replace(/\s+/g, '');
          
          // Agrupa em pares de dígitos
          const pairs = [];
          for (let i = 0; i < cleanNumber.length; i += 2) {
            const pair = cleanNumber.slice(i, i + 2);
            // Adiciona zero à esquerda se necessário
            const formattedPair = pair.padStart(2, '0');
            pairs.push(formattedPair);
          }
          
          formattedCell = pairs.join(' ');
        }

        // Destaca o número concatenado
        if (formattedCell.replace(/\s+/g, '') === highlightNumber) {
          output += `<td class='highlight'>${formattedCell}</td>`;
        } else {
          output += `<td>${formattedCell}</td>`;
        }
      }
      output += "</tr>";
    }

    output += "</tbody></table>";
    return output;
  };

  return (
    <div className="sorteio-container">
      <h1>TENTA A SORTE BRASIL</h1>

      <div className="input-group">
        <label htmlFor="searchNumber-grid">DEZENAS SORTEADAS:</label>
        
        <div className="search-number-grid">
          {searchNumbers.map((number, index) => (
            <input
              key={index}
              type="text"
              maxLength="2"
              className="number-part"
              value={number}
              onChange={(e) => handleNumberChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="prizeSelection">PRÊMIOS:</label>
        <div className="prizeSelection button-group">
          {[
            { value: '1', text: '1º PRÊMIO' },
            { value: '2', text: '2º PRÊMIO' },
            { value: '3', text: '3º PRÊMIO' },
            { value: '4', text: '4º PRÊMIO' },
            { value: '5', text: '5º PRÊMIO' },
            { value: '6', text: 'EXTRA' }
          ].map((prize) => (
            <button
              key={prize.value}
              onClick={() => setPrizeSelection(prize.value)}
              className={`prize-button ${selectedPrize === prize.value ? 'selected' : ''}`}
            >
              {prize.text}
            </button>
          ))}
        </div>
      </div>

      <button onClick={concatenateNumber}>SORTEAR</button>
      <button onClick={getCouponByNumber}>CUPOM</button>

      <div id="resultado" dangerouslySetInnerHTML={{ __html: result }}></div>
    </div>
  );
};

export default Sorteio; 