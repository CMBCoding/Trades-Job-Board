const jobTable = new DataTable('#job-table', {
            responsive: true,
            columns: [
                {name: 'apply'},
                {name: 'job_title'},
                {name: 'trade_area'},
                {name: 'company_name'},
                {name: 'job_location'},
                {name: 'position_type'},
                {name: 'position_status'},
                {name: 'end_date'}
            ],
            order: [],

            // Filter buttons
            buttons: [
                {
					extend: 'collection',
					text: 'Filter',
                    className: 'dropdownbtn',
					buttons: [ 
                        {
                        extend: 'spacer',
				        },
                        {
                            text: 'Carpentry',
                            className: 'filterbtn' ,
                            action: function() {
                               jobTable.column(2).search('Carpentry').draw(); 
                            }
                        },
                        {
                        extend: 'spacer',
				        },
                        {
                            text: 'Welding',
                            action: function() {
                               jobTable.column(2).search('Welding').draw(); 
                            }
                        },
                        {
                        extend: 'spacer',
				        },
                        {
                            text: 'Manufacturing',
                            action: function() {
                               jobTable.column(2).search('Manufacturing').draw(); 
                            }
                        }
                        

                    ]
				},
                'excel',               
            ],
            
            layout: {
                topStart: 'buttons',
            }
        });