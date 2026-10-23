sap.ui.define(
	[
		'sap/ui/core/mvc/ControllerExtension',
		'sap/ui/export/Spreadsheet',
		"sap/ui/export/library",
		'sap/m/MessageBox',
		'sap/m/MessageToast',
		'sap/m/MessageView',
		'sap/m/MessageItem',
		'sap/m/Dialog',
		'sap/m/Button',
		'sap/ui/model/json/JSONModel'
	],
	function (ControllerExtension, Spreadsheet, exportLibrary, MessageBox, MessageToast, MessageView, MessageItem, Dialog, Button, JSONModel) {
		'use strict';

		const EdmType = exportLibrary.EdmType;

		return ControllerExtension.extend('gapmm003ui01.zui5gapmm003.ext.controller.CCExcelUploadExt', {

			override: {
				onInit: function () {
					var oModel = this.base.getExtensionAPI().getModel();
					this.oServicePath = "/ZC_MM_MONCOMP/com.sap.gateway.srvd.zsd_mm_moncomp.v0001."
				},
				editFlow: {
					onAfterActionExecution: function (oEvent) {
						if (oEvent.split(".")[6] === 'downloadTemplate') {
							this.downloadTemplate();
						}
					}
				}
			},

			downloadTemplate: function (oDownload) {
				var oCols = [
					{ label: "Sociedad", property: "Sociedad", type: EdmType.String },
					{ label: "Centro", property: "Centro", type: EdmType.String },
					{ label: "Proveedor", property: "Proveedor", type: EdmType.String },
					{ label: "Orden de Compra", property: "OC", type: EdmType.String },
					{ label: "Posición", property: "Pos", type: EdmType.String },
					{ label: "Factura / Remisión", property: "Factura", type: EdmType.String },
					{ label: "Material", property: "Material", type: EdmType.String },
					{ label: "Precio unitario Vigente", property: "Precio", type: EdmType.Number },
					{ label: "Moneda", property: "Moneda", type: EdmType.String},
					{ label: "Fecha factura", property: "FechaFactura", type: EdmType.String }
				];

				var oSettings = {
					workbook: { columns: oCols },
					dataSource: [{}],
					fileName: "Template.xlsx",
					showProgress: true
				}

				var oSpreadsheet = new Spreadsheet(oSettings);

				oSpreadsheet.build().finally(function () {
					MessageToast.show('Template.xlsx descargado correctamente');
				}).catch(function (oError) {
					MessageBox.error(oError + "Error al descargar Template.xlsx");
				}).finally(function () {
					oSpreadsheet.destroy();
				})
			},

			uploadexceldialog: function () {
				var oView = this.getView();

				if (!this.oDialog) {
					this.oDialog = sap.ui.core.Fragment.load({
						id: oView.getId(),
						name: "gapmm003ui01.zui5gapmm003.ext.fragment.filedialog",
						controller: this,
					}).then(function (oDialog) {
						oView.addDependent(oDialog);
						return oDialog;
					});
				}

				this.oDialog.then(function (oDialog) {
					oDialog.open();
				})
			},

			onFileChange: function (oChange) {
				var oFile = oChange.getParameters().files[0];

				this.fileType = oFile.type;
				this.fileName = oFile.name;

				var oFileReader = new FileReader();

				oFileReader.onload = function (oEvent) {
					this.ofilecontent = oEvent.target.result.split(",")[1];
				}.bind(this);

				oFileReader.readAsDataURL(oFile);
			},

			onUploadPress: function () {
				this.oFileUploaderInput = this.getView().byId("idFileUpload");

				if (this.ofilecontent === '' || this.ofilecontent === undefined) {
					MessageBox.error("Archivo no válido. Seleccione un archivo para cargar.")
					return;
				}

				var oModel = this.base.getModel();
				var oContext = oModel.bindContext(this.oServicePath + "uploadExcel(...)")

				oContext.setParameter("mimeType", this.fileType);
				oContext.setParameter("fileName", this.fileName);
				oContext.setParameter("fileContent", this.ofilecontent);

				// ativa o indicador de carregamento dentro do próprio diálogo de upload
				this.oDialog.then(function (oDialog) {
					oDialog.setBusyIndicatorDelay(0);
					oDialog.setBusy(true);
				});

				oContext.execute().then(function () {
					this.oDialog.then(function (oDialog) {
						oDialog.setBusy(false);
						oDialog.close();
					});

					this._showUploadMessages();

					this.oFileUploaderInput.clear();
					this.ofilecontent = '';
				}.bind(this)).catch(function (oError) {
					this.oDialog.then(function (oDialog) {
						oDialog.setBusy(false);
						oDialog.close();
					});

					this._showUploadMessages();

					this.oFileUploaderInput.clear();
					this.ofilecontent = '';
				}.bind(this))
			},

			_showUploadMessages: function () {
				var oMessageManager = sap.ui.getCore().getMessageManager();
				var aMessages = oMessageManager.getMessageModel().getData();

				var oMessageView = new MessageView({
					items: {
						path: "message>/",
						template: new MessageItem({
							title: "{message>message}",
							subtitle: "{message>additionalText}",
							type: "{message>type}",
							description: "{message>description}"
						})
					}
				});

				oMessageView.setModel(new JSONModel(aMessages), "message");

				var oResultDialog = new Dialog({
					title: "Resultado de la carga",
					contentWidth: "500px",
					contentHeight: "400px",
					verticalScrolling: false,
					content: oMessageView,
					beginButton: new Button({
						text: "Cerrar",
						press: function () {
							oResultDialog.close();
						}
					}),
					afterClose: function () {
						oMessageManager.removeAllMessages();
						oResultDialog.destroy();
					}
				});

				this.getView().addDependent(oResultDialog);
				oResultDialog.open();
			},

			onCancelUpload: function () {
				this.getView().byId("idfileUploadDialog").close();
			}
		});
	});
