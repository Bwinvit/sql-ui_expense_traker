import { Field, CollectionConfig } from 'payload/types';

const Category: CollectionConfig = {
      slug: "category",
      fields: [
            {
                  name: "title",
                  type: "text",
                  label: "Title",
                  required: true,
            },
            {
                  name: "transactionType",
                  type: "select",
                  label: "Transaction Type",
                  options: [
                        { label: "Income", value: "income" },
                        { label: "Expense", value: "expense" },
                  ],
                  required: true,
            }
      ],
}


export { Category };
