<template>
    <div class="pdf">
        <button class="table-button" @click="DownloadPDF">Download Invoice PDF</button>
    </div>
</template>

<script>
import jsPDF from 'jspdf'
import axios from 'axios'

export default {
    name: 'Pdf',
    props: ['invoice'],
    data () {
        return {
        }
    },
    methods: {
        DownloadPDF() {
            //fetch user_info from database
            axios.get("http://localhost:3000/user/" + this.invoice.user_id,
            {
                headers: { "Authorization": `${JSON.parse(sessionStorage.getItem("user-info")).token}` }
            })
            .then(response => {
              let user_info = response.data;
            
              let doc = new jsPDF('p', 'mm', 'a4')
              doc.text('Invoice', 170, 19)
              // doc.addImage('/img/logo.png', 'PNG', 10, 10, 59, 13)

              doc.setFontSize(12)
              doc.text(user_info.name,100, 50)
              doc.text(user_info.email,100, 55)
              doc.text("User Id : " + this.invoice.user_id,100, 60)

              doc.text('Invoice Number: ' + this.invoice._id, 10, 85)
              doc.text('Date: ' + this.invoice.date.slice(0,10), 10, 90)
              doc.text('Status: ' + this.invoice.status.charAt(0).toUpperCase() + this.invoice.status.slice(1), 10, 95)
              doc.text('Description: ' + this.invoice.description, 10, 100)
              
              doc.setFontSize(16)
              doc.setFont(undefined, 'bold')
              doc.text('Items :', 10, 120)

              doc.setFontSize(12)
              doc.setFont(undefined, 'normal')
              let y = 130
              for (let i = 0; i < this.invoice.invoices_lines.length; i++) {
                  doc.text('Item id: ' + this.invoice.invoices_lines[i].item_id, 10, y)
                  doc.text('Description: ' + this.invoice.invoices_lines[i].description, 10, y + 5)
                  doc.text('Price: ' + this.invoice.invoices_lines[i].amount + ' €', 10, y + 10)
                  y+=20
                  if(y > 270)
                  {
                      doc.addPage('a4', 'p')
                      y = 10
                  }
              }
              
              doc.line(10, y, 200, y)
              
              doc.setFont(undefined, 'bold')
              doc.text('Total: ' + this.invoice.total_amount + ' € ' + '(' +this.invoice.status.charAt(0).toUpperCase()+this.invoice.status.slice(1)+ ')', 10, y + 10)
              
              doc.save(`Invoice_${user_info.name}.pdf`)
            })
        }   
    },
    }

</script>
