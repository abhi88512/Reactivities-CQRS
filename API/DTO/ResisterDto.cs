using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class ResisterDto
{
    [Required]
    public string DisplayName { get; set; } = "";

    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";

    public string Password { get; set; } = "";
}
