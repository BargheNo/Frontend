import useHasPermission from "./hasPermission";

const adminPermissions = [
	"general.all",
	"user.viewAll",
	"user.banUnban",
	"user.changeRole",
	"user.viewRoles",
	"user.manageRolePermissions",
	"user.removeRole",
	"user.createRole",
	"corporation.viewAll",
	"corporation.approveDecline",
	"installationRequest.viewAll",
	"installationRequest.edit",
	"installationRequest.remove",
	"ticket.viewAll",
	"ticket.respond",
	"ticket.close",
	"ticket.comment",
	"report.viewAll",
	"report.respond",
	"admin_blog.viewAll",
	"admin_blog.create",
	"admin_blog.edit",
	"admin_blog.delete",
	"news.viewAll",
	"news.create",
	"news.edit",
	"news.delete",
	"panel.viewAll",
	"panel.create",
];

export default function hasAdminAnyPermission() {
	return adminPermissions
		.map((adminPermission) => useHasPermission(adminPermission))
		.some((value) => value === true);
}
