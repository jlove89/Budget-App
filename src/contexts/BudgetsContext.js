import React, { useContext, useState } from "react"
import { v4 as uuidV4 } from 'uuid'


const BudgetsContext = React.createContext()


export function useBudgets() {
    return useContext(BudgetsContext)
}

/*{
    id:
    name:
    max:
    min:
}

{
    id:
    budgetId:
    amount:
    description:
}*/

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = []

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    
    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id:uuidV4(), description, amount, budgetId }]
        })
    }
    
    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id:uuidV4(), name, max }]
        })
    }
    
    function deleteBudget() {

    }
    
    function deleteExpense(){

    }
    
    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>{children}</BudgetsContext.Provider>
    )
}