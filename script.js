document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = calculateTotal();
    
    updateTotal();
    displayExpenses();

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if (name !== "" && amount > 0 && !isNaN(amount)) {
            const newExpense = {
                name: name,
                amount: amount,
                id: Date.now()
            };
            
            expenses.push(newExpense);
            saveToLocalStorage();
            displayExpenses();
            updateTotal();
            
            expenseNameInput.value = '';
            expenseAmountInput.value = '';
        }
    });

    function displayExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(exp => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${exp.name}</span>
                <span>$${exp.amount.toFixed(2)}</span>
                <button data-id="${exp.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    function calculateTotal() {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    function saveToLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const id = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(exp => exp.id !== id);
            
            saveToLocalStorage();
            displayExpenses();
            updateTotal();
        }
    });
});